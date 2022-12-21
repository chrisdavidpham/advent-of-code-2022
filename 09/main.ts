import * as fs from 'fs';
import * as rd from 'readline';
import './arrayExtensions'
import { Rope } from './Rope';

var rope = new Rope();

const stream = fs.createReadStream('input.txt');
var reader = rd.createInterface(stream);

function execute(command: string, r: Rope): void {
    const split = command.split(' ');
    const direction = split[0];
    const distance = parseInt(split[1]);

    for (var i = 0; i < distance; i++) {
        switch (direction) {
            case "U":
                r.moveNorth();
                break;
            case "R":
                r.moveEast();
                break;
            case "D":
                r.moveSouth();
                break;
            case "L":
                r.moveWest();
                break;
        }
    }
}

reader.on('line', (l) => {
    execute(l, rope);
});

reader.on('close', () => {
    console.log(rope.getUniqueTailPositionCount());
});