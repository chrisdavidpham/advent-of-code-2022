import * as fs from 'node:fs';
import * as readline from 'node:readline';
import './arrayExtensions'
import { Rope } from './rope';

var shouldDraw = false;

if (process.argv[2] && process.argv[2] === '-d') { 
    shouldDraw = true;
}

const fileReadStream = readline.createInterface(fs.createReadStream('input.txt'));

var rope = new Rope(10);

function execute(command: string, r: Rope): void {
    const split = command.split(' ');
    const direction = split[0];
    const distance = parseInt(split[1]);

    for (var i = 0; i < distance; i++) {
        switch (direction) {
            case 'U':
                r.moveNorth();
                break;
            case 'R':
                r.moveEast();
                break;
            case 'D':
                r.moveSouth();
                break;
            case 'L':
                r.moveWest();
                break;
        }
    }
}

if (shouldDraw)
{
    fileReadStream.on('line', (l) => {
        console.log(`${l}: ${rope.toString()}`);
        execute(l, rope);
        console.log(rope.draw());
    });
}
else
{
    fileReadStream.on('line', (l) => {
        execute(l, rope);
    });
}

fileReadStream.on('close', () => {
    console.log(rope.getUniqueTailPositionCount());
});