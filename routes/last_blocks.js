import blockchain from "./../blockchain.js";

export default (request, response) => {
  response.status(200).send(blockchain.last(request.params.count))
}
