import { web3, lms } from '../helpers/web3.helper'

export class MemberController {
    getAllMembers (req, res) {
		lms.getAllMembers()
		.then((result) => {
			res.json({ result });
		})
		.catch((err) => {
			console.log(err);
		});
    }
	numberOfMembers (req, res) {
		lms.numMembers()
		.then((result) => {
			res.json({ result });
		})
		.catch((err) => {
			console.log(err);
		});
	}
	ownerdetails (req, res) {
		lms.getOwnerDetails()
		.then((result) => {
			res.json({ result });
		})
		.catch((err) => {
			console.log(err);
		});
	}
	memberdetails (req, res) {
		if ("email" in req.query) {
			console.log("Displaying member details by email : " + req.query.email);
			lms.getMemberDetailsByEmail(req.query.email)
			.then((result) => {
				res.json({ result });
			})
			.catch((err) => {
				console.log(err);
			});
		}
		else if ("adr" in req.query) {
			console.log("Displaying member details by account : " + req.query.adr);
			lms.getMemberDetailsByAccount(req.query.adr)
			.then((message) => {
				res.json({ message });
			})
			.catch((err) => {
				console.log(err);
			});
		}
		else if ("id" in req.query) {
			console.log("Displaying member details by index : " + req.query.id);
			lms.getMemberDetailsByIndex(req.query.id)
			.then((message) => {
				res.json({ message });
			})
			.catch((err) => {
				console.log(err);
			});
		}
	}
	addMember (req, res){
		var data = req.body;
		lms.addMember(data.name, data.address, data.email, {
				from: web3.eth.accounts[0],
				gas: 6000000
		})
		.then((result) => {
			res.json({ result });
		})
		.catch((err) => {
			console.log(err);
		});
	}
	removeMember (req, res){
		var data = req.body;
		lms.removeMember(data.address, {
				from: data.account,
				gas: 6000000
		})
		.then((result) => {
			res.json({ result });
		})
		.catch((err) => {
			console.log(err);
		});
	}
}