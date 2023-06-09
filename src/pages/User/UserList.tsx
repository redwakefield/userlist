import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, selectUsers, deleteUser, selectLoading, selectError } from '../../store/userSlice';
import { User } from '../../models/User';
import { AppDispatch } from '../../store';

export function UserList() {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectUsers);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
  

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const handleDeleteUser = async (user: User) => {
        await dispatch(deleteUser(user.id));
    }

    if (loading) {
        return <>
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
	            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
	            <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
	            <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
            </div>
        </>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }
    

    return (
        <div className="container my-24 mx-auto md:px-6">
          <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our Users</h2>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {users.map((user: any) => (
            <li key={user.name}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={user.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{user.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{user.email}</p>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{user.phone}</p>
                  
                  <button  className="bg-white hover:bg-gray-100 text-gray-800  py-2 px-4 border border-gray-400 rounded shadow" onClick={() => handleDeleteUser(user)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
        </div>
    )
}