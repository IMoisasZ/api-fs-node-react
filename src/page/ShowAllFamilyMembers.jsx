import React, { useState, useEffect } from 'react'
import { typeFamilyMembers } from '../utils/typeFamilyMembers'
import style from './ShowAllFamilyMembers.module.css'
import DeleteFamilyMembers from './DeleteFamilyMembers'

export default function ShowAllFamilyMebers({
	allfamilyMebers,
	setNameButton,
	setStatusForm,
	setDataUpdate,
}) {
	const [allFamilyMembersRecevied, setAllFamilyMembersRecevied] = useState([])

	useEffect(() => {
		setAllFamilyMembersRecevied(allfamilyMebers)
	}, [allfamilyMebers])

	const [statusFormShowFamilyMembers, setStatusFormShowFamilyMembers] =
		useState('show')
	const [memberDelete, setMemberDelete] = useState([])

	const handleUpdate = (member) => {
		setNameButton('Update')
		setStatusForm('create')
		setDataUpdate(member)
	}

	const handleDelete = (member) => {
		setStatusFormShowFamilyMembers('delete')
		setMemberDelete(member)
	}

	if (allFamilyMembersRecevied.length === 0) {
		return (
			<div className={style.containerNoFamilyMembers}>
				<p>There was no family members include!</p>
			</div>
		)
	}

	if (statusFormShowFamilyMembers === 'show') {
		return (
			<>
				{allFamilyMembersRecevied.map((member) => {
					return (
						<div className={style.container}>
							<div className={style.data}>
								<p>
									<span>Name:</span> {member.name}
								</p>
								<p>
									<span>Type:</span> {typeFamilyMembers[Number(member.type)]}
								</p>
								<p>
									<span>Age:</span> {member.age}
								</p>
								<div>
									<p>
										<span>Description:</span> {member.description}
									</p>
								</div>
							</div>
							<div className={style.btn}>
								<button
									onClick={() => handleUpdate(member)}
									className={style.btnUpdate}>
									Update
								</button>
								<button
									onClick={() => handleDelete(member)}
									className={style.btnDelete}>
									Delete
								</button>
							</div>
						</div>
					)
				})}
			</>
		)
	} else {
		return (
			<DeleteFamilyMembers
				setStatusFormShowFamilyMembers={setStatusFormShowFamilyMembers}
				memberDelete={memberDelete}
				setStatusForm={setStatusForm}
				setAllFamilyMembersRecevied={setAllFamilyMembersRecevied}
			/>
		)
	}
}
