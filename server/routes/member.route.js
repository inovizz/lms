import express from 'express';
import { MemberController } from '../controllers/member.controller';

const router = express.Router();
const MemberCtrl = new MemberController();

router.route('/')
    /** GET /api/members - Get list of members */
    .get(MemberCtrl.getAllMembers);

router.route('/numberofmembers')
    /** GET /api/members/numberofmembers - Get number of members */
    .get(MemberCtrl.numberOfMembers);

router.route('/ownerdetails')
    /** GET /api/members/ownerdetails - Get details of owner */
    .get(MemberCtrl.ownerdetails);

router.route('/memberdetails')
    /** GET /api/members/memberdetails - Get details of members */
    .get(MemberCtrl.memberdetails);

router.route('/addmember')
    /** GET /api/members/addmember - Add a new member */
    .post(MemberCtrl.addMember);

router.route('/removemember')
    /** GET /api/members/addmember - Remove a existing member */
    .post(MemberCtrl.removeMember);


export default router;