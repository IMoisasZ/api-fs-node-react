import { Router } from 'express'
import MembersFamilyController from '../controllers/members.controller.js'

const routes = Router()

routes.post('/', MembersFamilyController.createMemberFamily)
routes.put('/', MembersFamilyController.updateMemberFamily)
routes.get('/', MembersFamilyController.getMembersFamily)
routes.get('/:id', MembersFamilyController.getMemberFamily)
routes.delete('/:id', MembersFamilyController.deletedMember)

export default routes
