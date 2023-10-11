import MemberFamilyService from '../services/members.service.js'

const createMemberFamily = (req, res, next) => {
	const memberFamily = req.body
	return res.send(MemberFamilyService.createMemberFamily(memberFamily))
}

const updateMemberFamily = (req, res, next) => {
	const memberFamily = req.body
	return res.send(MemberFamilyService.updateMemberFamily(memberFamily))
}

const getMembersFamily = (req, res, next) => {
	try {
		return res.send(MemberFamilyService.getMembersFamily())
	} catch (error) {
		next(error)
	}
}

const getMemberFamily = (req, res, next) => {
	try {
		return res.send(MemberFamilyService.getMemberFamily(req.params.id))
	} catch (error) {
		next(error)
	}
}

const deletedMember = (req, res, next) => {
	try {
		return res.send(MemberFamilyService.deletedMember(req.params.id))
	} catch (error) {
		throw error
	}
}

export default {
	createMemberFamily,
	updateMemberFamily,
	getMembersFamily,
	getMemberFamily,
	deletedMember,
}
