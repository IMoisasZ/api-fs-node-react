import React, { useEffect, useState } from 'react'
import { typeFamilyMembers } from '../utils/typeFamilyMembers'
import api from '../api/api.members'
import style from './MembersFamily.module.css'
import HeaderFamilyMebers from './HeaderFamilyMembers'
import ShowAllFamilyMebers from './ShowAllFamilyMembers'

export default function MembersFamily() {
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [typeMember, setTypeMember] = useState('')
	const [age, setAge] = useState('')
	const [description, setDescription] = useState('')
	const [showMessage, setShowMessage] = useState({})
	const [nameOfButton, setNameOfButton] = useState('Include')
	const [statusForm, setStatusForm] = useState('create')
	const [allMembers, setAllMembers] = useState([])
	const [dataUpdate, setDataUpdate] = useState([])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!description) {
			setShowMessage({
				type: 'error',
				message: 'Please inform a little description!(Min: 10 caracters',
			})
			return
		}
		if (description.length < 10) {
			setShowMessage({
				type: 'error',
				message: 'Please inform a little desciprion with the min 10 caracters',
			})
			return
		}
		switch (nameOfButton) {
			case 'Include':
				try {
					await api.post('/members-of-family', {
						name,
						type: typeMember,
						age,
						description,
					})
					setShowMessage({
						type: 'success',
						message: 'Family member add successfully!',
					})
					setTimeout(() => {
						handleClear()
					}, 2000)
				} catch (error) {
					setShowMessage({ type: 'error', message: error })
				}
				break
			case 'Update':
				try {
					api.put('/members-of-family', {
						id,
						name,
						type: typeMember,
						age,
						description,
					})
					setShowMessage({
						type: 'alter',
						message: 'Family member modifyied successfully',
					})
					setTimeout(() => {
						handleClear()
					}, 2000)
				} catch (error) {
					setShowMessage({ type: 'error', message: error })
				}
				break
			default:
				break
		}
	}

	const handleClear = () => {
		setId('')
		setName('')
		setTypeMember('')
		setAge('')
		setDescription('')
		setShowMessage({})
		setNameOfButton('Include')
	}

	const loadMembersOfFamily = async () => {
		try {
			const { data } = await api.get('/members-of-family')
			setAllMembers(data)
		} catch (error) {
			setShowMessage({ type: 'error', message: error })
		}
	}

	useEffect(() => {
		if (statusForm === 'show') {
			loadMembersOfFamily()
		}
	}, [statusForm])

	useEffect(() => {
		if (dataUpdate) {
			setId(dataUpdate.id)
			setName(dataUpdate.name)
			setTypeMember(dataUpdate.type)
			setAge(dataUpdate.age)
			setDescription(dataUpdate.description)
		}
	}, [dataUpdate])

	return (
		<>
			<HeaderFamilyMebers
				statusForm={statusForm}
				setStatusForm={setStatusForm}
			/>
			{statusForm === 'create' ? (
				<main>
					<form onSubmit={(e) => handleSubmit(e)}>
						<div className={style.elementsForm}>
							<label
								htmlFor='name'
								id='name'>
								Name member of family:
							</label>
							<input
								type='text'
								id='name'
								value={name}
								onChange={(e) => setName(e.currentTarget.value)}
								required
								autoFocus
							/>
						</div>
						<div className={style.elementsForm}>
							<label
								htmlFor='typeMember'
								id='typeMember'>
								Type member of family:{' '}
							</label>
							<select
								type='text'
								id='typeMember'
								value={typeMember}
								onChange={(e) => setTypeMember(e.currentTarget.value)}
								required>
								<option value=''>...</option>
								{typeFamilyMembers.map((member, index) => {
									return (
										<option
											key={index}
											value={index}>
											{member}
										</option>
									)
								})}
							</select>
						</div>
						<div className={style.elementsForm}>
							<label
								htmlFor='age'
								id='age'>
								Age member of family:{' '}
							</label>
							<input
								type='number'
								min={1}
								max={100}
								id='age'
								value={age}
								onChange={(e) => setAge(e.currentTarget.value)}
								required
							/>
						</div>
						<div className={style.elementsForm}>
							<label
								htmlFor='description'
								id='description'>
								Make a small description about the member of family:{' '}
							</label>
							<textarea
								id='description'
								rows={10}
								cols={43}
								value={description}
								onChange={(e) => setDescription(e.target.value)}></textarea>
						</div>
						<button
							type='submit'
							className={
								nameOfButton === 'Include' ? style.include : style.update
							}>
							{' '}
							{nameOfButton}
						</button>
						<button
							type='button'
							onClick={() => handleClear()}
							className={style.clear}>
							Limpar Campos
						</button>
						{showMessage && (
							<p
								className={
									showMessage.type === 'error'
										? style.error
										: showMessage.type === 'success'
										? style.success
										: showMessage.type === 'alter'
										? style.alter
										: ''
								}>
								{showMessage.message}
							</p>
						)}
					</form>
				</main>
			) : (
				<section className={style.sectionShowFamilyMembers}>
					<ShowAllFamilyMebers
						allfamilyMebers={allMembers}
						setNameButton={setNameOfButton}
						setStatusForm={setStatusForm}
						setDataUpdate={setDataUpdate}
					/>
				</section>
			)}
		</>
	)
}
