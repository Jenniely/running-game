
class Vector {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    };

    plus = (vector) => {
        if (!(vector instanceof Vector)) {
            throw new Error('You can only add Vector to Vector')
        }
        let newX = this.x + vector.x;
        let newY = this.y + vector.y;
        return new Vector(newX, newY);
    };

    times = (n) => {
        let newX = this.x * n;
        let newY = this.y * n;
        return new Vector(newX, newY);
    };
}

class Actor {

    constructor(pos = new Vector(0,0), size = new Vector(1,1), speed = new Vector(0,0)) {
        if (!(pos instanceof Vector)|| !(size instanceof Vector) || !(speed instanceof Vector)) {
            throw new Error('Only Vector instances allowed as arguments')
        }
        this.pos = pos;
        this.size = size;
        this.speed = speed;
    };

    get type() {
        return 'actor';
    }

    get left() {
        return this.pos.x;
    }

    get right() {
        return this.pos.x + this.size.x;
    }

    get top() {
        return this.pos.y;
    }

    get bottom() {
        return this.pos.y + this.size.y;
    }

    act = () => {};

    isIntersect = (actor) => {
        if (!(actor instanceof Actor) || (actor === undefined)) {
            throw new Error('Function received invalid argument')
        }
        if (actor === this) {
            return false
        }
        if (actor.left < this.right && actor.right > this.left && actor.top < this.bottom && actor.bottom > this.top)  {
            return true;
        } else {
            return false;
        }

    }
};

class Level {

    constructor(grid = [], actors = []) {
        this.grid = grid;
        this.actors = actors;
        this.status = null;
        this.finishDelay = 1;
        this.height = this.grid.length;
        this.width = Math.max(0, ...this.grid.map(element => element.length));
        this.player = this.actors.find(element => element.type === 'player');
    }

    isFinished = () => {
        if (!(this.status === null) && this.finishDelay < 0) {
            return true
        } else return false;
    }

    actorAt = (actor) => {
        if (!(actor instanceof Actor) || (actor === undefined)) {
            throw new Error('Function received invalid argument')
        }
        return this.actors.find(element => {
            element.isIntersect(actor)
        });
    }

    obstacleAt = (pos, size) => {
        if (!(pos instanceof Vector)|| !(size instanceof Vector)) {
            throw new Error('Only Vector instances allowed as arguments')
        }
        let newPos = new Actor(pos, size);
        if (newPos.left < 0 ||  newPos.top < 0 || (newPos.right >= this.width)) {
            return 'wall';
        }
        if (newPos.bottom > this.height) {
            return 'lava';
        }
        let obstacle = this.grid.slice(newPos.top, newPos.bottom).forEach(row => {
            row.slice(newPos.left, newPos.right).find(el => el != undefined)
        });
        return obstacle;

    }
}

/* const grid = [
    new Array(3),
    ['wall', 'wall', 'lava']
  ];
  const level = new Level(grid);
  runLevel(level, DOMDisplay); */