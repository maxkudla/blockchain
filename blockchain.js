
const Rx = require('rx');
const sha256 = require('sha256');

const initialBlock = {
  block_hash: '0'
}

class Blockchain {

  constructor (initial = initialBlock) {
    const {block_hash = '0'} = initial;

    this._chain = {
      [block_hash]: initial
    }
    this._previous_block_hash = block_hash;

    this.add = new Rx.Subject();
  }

  last (count) {
    let last = [];

    for(let i = 0, previous_block_hash = this._previous_block_hash;  i < count; i ++) {
      let previous_block = this._chain[previous_block_hash];
      if (previous_block) {
        last.push(previous_block);
        previous_block_hash = previous_block.previous_block_hash;
      } else {
        break;
      }
    }

    return last;
  }

  mine (rows) {
    const block = {
      previous_block_hash: this._previous_block_hash,
      rows,
      timestamp: new Date().getTime()
    }

    const block_hash = sha256(JSON.stringify(block));

    this._chain[block_hash] = {
      ...block,
      block_hash
    }

    this._previous_block_hash = block_hash;
  }
}

var blockchain = new Blockchain(initialBlock);

blockchain.add
  .map(({request, response})=>{
    response.sendStatus(200);
    return request.body.data;
  })
  .bufferCount(5)
  .subscribe((rows) => {
    blockchain.mine(rows)
  }, console.log);

export default blockchain
