const human_data = require('data-store')({ path: process.cwd() + '/data/humans.json' });

class human {

    constructor (id, owner, human) {
        this.id = id;
        this.owner = owner;
        this.human = human;
    }

    update (human) {
        this.human = human;
        human_data.set(this.id.toString(), this);
    }

    delete () {
        human_data.del(this.id.toString());
    }
}

human.getAllIDs = () => {
    return Object.keys(human_data.data).map(id => parseInt(id));
};

human.getAllIDsForOwner = (owner) => {
    return Object.keys(human_data.data).filter(id => human_data.get(id).owner == owner).map(id => parseInt(id));
}

human.findByID = (id) => {
    let sdata = human_data.get(id);
    if (sdata != null) {
        return new human(sdata.id, sdata.owner, sdata.human);
    }
    return null;
};

human.next_id = human.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

human.create = (owner, human) => {
    let id = human.next_id;
    human.next_id += 1;
    let s = new human(id, owner, human);
    human_data.set(s.id.toString(), s);
    return s;
}

module.exports = human;