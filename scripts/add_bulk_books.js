/*jslint es6 */
/*jslint for:true */
// Add the bulk books using the addBook function.

var Contract =  require("../app/config.js").default;
var data = require("../app/mockdata/books.js");
const LMS = artifacts.require("../contracts/LMS.sol");

module.exports = function(handleError) {
    //Calculating the nonce count to avoid the ambiguity of setting the same nonce to more than one transaction.
    var nonceCount = web3.eth.getTransactionCount(web3.eth.accounts[0])

    LMS.at(Contract.id).then( function(result) {
        for (var i = 0; i < data.mockbooks.length; i++) {
            //Iterating the mock data to call the addBook function
            result.addBook(data.mockbooks[i].title, data.mockbooks[i].author, data.mockbooks[i].publisher,
                data.mockbooks[i].img, data.mockbooks[i].description, data.mockbooks[i].genre,
                 {"nonce": nonceCount+i }).then(
                function(res) {
                    console.log(res)
                }).catch(function(err) {
                console.log(err)
            })
        }
    })
}

var handleError = function(error) {
    console.log(error)
}
