import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const { userId } = auth()
    
    if (!userId) {
      console.log('No userId found in auth()')
      return NextResponse.json({ error: 'Unauthorized: No user ID found' }, { status: 401 })
    }

    console.log('Authenticated userId:', userId)

    // Fetch the current user to check if they have permission to list all users
    const currentUser = await clerkClient.users.getUser(userId)
    
    console.log('Current user public metadata:', currentUser.publicMetadata)

    // Check if the user has admin rights
    if (currentUser.publicMetadata.role !== 'admin') {
      console.log('User does not have admin role')
      return NextResponse.json({ error: 'Forbidden: User does not have admin rights' }, { status: 403 })
    }

    console.log('User has admin rights, fetching user list')

    const userList = await clerkClient.users.getUserList()
    const simplifiedUsers = userList.data.map(user => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0]?.emailAddress
    }))
    
    console.log('Fetched and simplified user list')

    return NextResponse.json(simplifiedUsers)
  } catch (error) {
    console.error('Error in /api/users route:', error)
    return NextResponse.json({ error: 'Failed to fetch users: ' + (error as Error).message }, { status: 500 })
  }
}