import * as fs from 'node:fs';
import * as readline from 'node:readline';
import './arrayExtensions'
import { Rope } from './rope';

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
    console.log(`${direction}: ${r.toString()}`);
    console.log(r.draw());
}

fileReadStream.on('line', (l) => {
    execute(l, rope);
});

fileReadStream.on('close', () => {
    console.log(rope.getUniqueTailPositionCount());
});