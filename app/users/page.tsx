
import { Suspense } from 'react'
// import 
import { Loader2 } from 'lucide-react'
import UsersTable from './_components/UserList'

export default async function UsersPage() {

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    }>
      <UsersTable  />
    </Suspense>
  )
}