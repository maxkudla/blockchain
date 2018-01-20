
import blockchain from "./../blockchain.js"

export default (request, response) => {
    blockchain.add.onNext({request, response})
}
