import MembersFamilyRepository from '../repositories/members.repository.js'
import { randomUUID } from 'crypto'
import { database } from '../utils/databse.utils.js'
import { existsSync, readFileSync } from 'fs'

const createMemberFamily = (memberFamily) => {
	try {
		if (existsSync(database)) {
			memberFamily.id = randomUUID()
			const members = [
				...JSON.parse(readFileSync(database, 'utf-8')),
				memberFamily,
			]

			return MembersFamilyRepository.createMemberFamily(members)
		} else {
			memberFamily.id = randomUUID()
			return MembersFamilyRepository.createMemberFamily([memberFamily])
		}
	} catch (error) {
		throw error
	}
}

const updateMemberFamily = (memberFamily) => {
	try {
		return MembersFamilyRepository.updateMemberFamily(memberFamily)
	} catch (error) {
		throw error
	}
}

const getMembersFamily = () => {
	try {
		if (existsSync(database)) {
			return MembersFamilyRepository.getMembersFamily()
		}
		throw new Error('Não há dados para apresentar')
	} catch (error) {
		throw error
	}
}

const getMemberFamily = (memberId) => {
	try {
		return MembersFamilyRepository.getMemberFamily(memberId)
	} catch (error) {
		throw error
	}
}

const deletedMember = (memberId) => {
	try {
		return MembersFamilyRepository.deleteMemberFamily(memberId)
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
