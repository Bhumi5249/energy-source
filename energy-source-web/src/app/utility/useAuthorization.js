'use client'
import { useSelector } from 'react-redux'


function useAuthorization(permissionCode) {
    console.log("permissionCodepermissionCode", permissionCode)
    const userData = useSelector((store) => store?.auth?.user?.data?.permissions)
    console.log(permissionCode, userData, '======================>>>>>>>. in hook');
    return userData && userData?.includes(permissionCode) ? true : false
}

export default useAuthorization
