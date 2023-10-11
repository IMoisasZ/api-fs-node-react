import React, { useState } from 'react'
import { typeFamilyMembers } from '../utils/typeFamilyMembers'
import api from '../api/api.members'
import style from './DeleteFamilyMembers.module.css'

export default function DeleteFamilyMembers({
	setStatusFormShowFamilyMembers,
	memberDelete,
	setStatusForm,
	setAllFamilyMembersRecevied,
}) {
	const [showMessage, setShowMessage] = useState('')
	const handleDelete = async () => {
		try {
			await api.delete(`/members-of-family/${memberDelete.id}`)
			setShowMessage({
				type: 'success',
				message: 'The family member was delete successfully!',
			})
			const { data } = await api.get('/members-of-family')
			setTimeout(() => {
				setStatusFormShowFamilyMembers('show')
				setStatusForm('show')
				setAllFamilyMembersRecevied(data)
			}, 2000)
		} catch (error) {}
	}

	return (
		<div className={style.container}>
			<div className={style.containerData}>
				<p>
					<span>Name:</span> {memberDelete.name}
				</p>
				<p>
					<span>Type:</span> {typeFamilyMembers[Number(memberDelete.type)]}
				</p>
				<p>
					<span>Age:</span> {memberDelete.age}
				</p>
				<p>
					<span>Description:</span> {memberDelete.description}
				</p>
			</div>

			<p>Are you sure you want to delete this family member?</p>
			<div className={style.containerBtn}>
				<button
					onClick={handleDelete}
					className={style.yes}>
					Yes
				</button>
				<button
					onClick={() => setStatusFormShowFamilyMembers('show')}
					className={style.no}>
					No
				</button>
			</div>
			{showMessage && (
				<p
					className={
						showMessage.type === 'error' ? style.error : style.success
					}>
					{showMessage.message}
				</p>
			)}
		</div>
	)
}
