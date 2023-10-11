import React from 'react'
import style from './MembersFamily.module.css'

export default function HeaderFamilyMebers({
	statusForm = 'create',
	setStatusForm,
}) {
	return (
		<header>
			<h1>Members Family</h1>
			<nav>
				<ul>
					<li
						onClick={() => setStatusForm('create')}
						className={statusForm === 'create' && style.mark}>
						Create a new member
					</li>
					<li
						onClick={() => setStatusForm('show')}
						className={statusForm === 'show' && style.mark}>
						Show all members
					</li>
				</ul>
			</nav>
		</header>
	)
}
