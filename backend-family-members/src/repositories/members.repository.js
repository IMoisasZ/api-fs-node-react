import { writeFileSync, readFileSync } from 'fs'
import { database } from '../utils/databse.utils.js'

const createMemberFamily = (memberFamily) => {
	try {
		return writeFileSync(database, JSON.stringify(memberFamily), 'utf8')
	} catch (error) {
		throw error
	}
}

const updateMemberFamily = (memberFamily) => {
	try {
		const alterMember = []
		const othersMembers = []
		JSON.parse(readFileSync(database, 'utf-8')).forEach((member) => {
			if (member.id === memberFamily.id) {
				alterMember.push(member)
			} else {
				othersMembers.push(member)
			}
		})

		alterMember[0].name = memberFamily.name
		alterMember[0].type = memberFamily.type
		alterMember[0].age = memberFamily.age
		alterMember[0].description = memberFamily.description

		createMemberFamily([...othersMembers, ...alterMember])
	} catch (error) {
		throw error
	}
}

const getMembersFamily = () => {
	try {
		return JSON.parse(readFileSync(database, 'utf-8'))
	} catch (error) {
		throw error
	}
}

const getMemberFamily = (memberId) => {
	try {
		const members = JSON.parse(readFileSync(database, 'utf8'))
		return members.filter((member) => member.id === memberId)
	} catch (error) {
		throw error
	}
}

const deleteMemberFamily = (memberId) => {
	const deletedMember = []
	const stayedMembers = []
	try {
		JSON.parse(readFileSync(database, 'utf-8')).forEach((member) => {
			if (member.id === memberId) {
				deletedMember.push(member)
			} else {
				stayedMembers.push(member)
			}
		})
		return createMemberFamily(stayedMembers)
	} catch (error) {
		throw error
	}
}

export default {
	createMemberFamily,
	updateMemberFamily,
	getMembersFamily,
	getMemberFamily,
	deleteMemberFamily,
}
