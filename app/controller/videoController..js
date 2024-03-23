const path = require('path');
const fs = require('fs');
const { TEMP_DIR, UPLOAD_DIR, CHUNK_SIZE, VIDEO_DIR } = require('../config/serverConfig');
const store = require('../cache/fileIndexContainer');
const state = require('../config/StateConfig');

function pipeStream(readStream, writeSteam) {
    return new Promise((resolve, reject) => {
        readStream.pipe(writeSteam).on("finish", resolve).on("error", reject);
    });
}

module.exports = {
    uploadVideo: async ctx => {
        const { fileHash, index } = ctx.query;
        const chunkPath = path.resolve(TEMP_DIR, fileHash, index);
        store[fileHash][index] = true;
        console.log(store[fileHash]);
        if (ctx.is('application/octet-stream')) {
            const writeStream = fs.createWriteStream(chunkPath);
            ctx.req.on('data', (chunk) => {
                writeStream.write(chunk);
            });
            ctx.req.on('end', () => {
                writeStream.end();
                console.log('end');
                ctx.body = {
                    code: state.UNFINISHED,
                    message: '接收成功',
                }
            });
            writeStream.on('error', (err) => {
                console.error('Error writing file:', err);
            });
            ctx.body = {
                code: state.UNFINISHED,
                message: '接收成功',
            }
        } else {
            ctx.body = {
                code: state.UNKNOW_ERROR,
                message: '未知类型错误',
            };
        }
    },
    loadRequst: async ctx => {
        const { fileHash, totalNum } = ctx.query;
        console.log("获取了请求", fileHash, totalNum);
        console.log(ctx.request.body);
        if (fileHash in store) {
            const failSeg = store[fileHash].filter(sign => sign === false);
            ctx.body = {
                code: state.UNFINISHED,
                message: "分片未传完",
                segment: failSeg,
            }
        }
        else {
            const chunkDir = path.resolve(TEMP_DIR, fileHash);
            console.log("request begin");
            console.log(typeof totalNum);
            let segmentSign = new Array(Number(totalNum)).fill(false);
            console.log(segmentSign);
            store[fileHash] = segmentSign;
            await fs.mkdirSync(chunkDir, { recursive: true });
            ctx.body = {
                code: state.UNFINISHED,
                message: "缓存文件夹已创建",
            }
        }
    },
    videoMerge: async ctx => {
        const { fileHash, suffix } = ctx.query;
        const failSeg = store[fileHash].filter(sign => sign === false);
        const chunkDir = path.resolve(TEMP_DIR, fileHash);
        console.log(chunkDir);
        const chunks = fs.readdirSync(chunkDir);
        console.log(chunks);
        if (failSeg.length === 0) {
            console.log(UPLOAD_DIR, fileHash);
            const uploadPath = path.resolve(UPLOAD_DIR, fileHash) + '.' + suffix;
            chunks.sort((a, b) => Number(a) - Number(b));
            const writeTask = chunks.map((chunkFilename, index) => {
                const chunkPath = path.resolve(chunkDir, chunkFilename);
                const readStream = fs.createReadStream(chunkPath)
                const writeStream = fs.createWriteStream(uploadPath, {
                    start: index * CHUNK_SIZE,
                });
                return pipeStream(readStream, writeStream);
            });
            await Promise.all(writeTask);
            ctx.body = {
                code: state.SUCCESS,
                message: "文件合并成功",
            }
        }
        else {
            ctx.body = {
                code: state.UNFINISHED,
                message: "仍有未发送的分片",
                segment: failSeg,
            }
        }
    },
    getVideo: async ctx => {
        const fileName = 'd41d8cd98f00b204e9800998ecf8427e.mp4';
        // TODO: 这里使用查询参数来请求文件
        const filePath = path.resolve(VIDEO_DIR, fileName);
        const fileState = fs.statSync(filePath);
        const range = ctx.req.headers.range.replace(/bytes=/, '').split('-');
        const start = Number(range[0]);
        const end = Number(range[1]) || start.size - 1;

        ctx.set('Content-Range', `bytes ${start}-${end}/${fileState.size}`)
        ctx.set('Accept-Ranges', 'bytes')
        ctx.type = 'video/mp4'
        ctx.status = 206;

        const stream = fs.createReadStream(filePath, {
            start,
            end
        })
        ctx.body = stream;
    }
}