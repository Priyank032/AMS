import axios from 'axios';

const usersUrl = 'http://localhost:8000';

export const LoginAll = async (user) => {
    return await axios.post(`${usersUrl}/login`, user);
}

export const ForgotPassword = async (user) => {
    return await axios.post(`${usersUrl}/forgot_password`, user);
}

export const ResetPassword = async (user,token,id) => {
    return await axios.post(`${usersUrl}/reset-password?token=${token}&id=${id}`, user);
}

export const UpdatePassword = async (user) => {
    return await axios.post(`${usersUrl}/Update_Password`, user);
}


export const Add_School = async (user) => {
    return await axios.post(`${usersUrl}/admin/companyRegister`, user);
}
export const All_Schools = async () => {
    return await axios.post(`${usersUrl}/admin/All_Users`);
}
export const getOneSchool = async (id) => {
    return await axios.post(`${usersUrl}/admin/edit_User/${id}`);
}

export const UpdateSchool = async (user,id) => {
    return await axios.post(`${usersUrl}/admin/update_User/${id}`,user);
}

export const DeleteSchool = async (id) => {
    return await axios.post(`${usersUrl}/admin/delete_User/${id}`);
}


export const TeachherRegistration = async (user) => {
    return await axios.post(`${usersUrl}/Dba/teacher_registration`, user);
}
export const StudentRegistration = async (user) => {
    return await axios.post(`${usersUrl}/Dba/student_registration`, user);
}



export const getTeachers = async (institutionId) => {
    return await axios.post(`${usersUrl}/Dba/All_Teachers`, institutionId);
}
export const getOneTeacher = async (id) => {
    return await axios.post(`${usersUrl}/Dba/All_Teachers/edit_Teacher/${id}`);
}

export const UpdateTeacher = async (user,id) => {
    return await axios.post(`${usersUrl}/Dba/All_Teachers/update_Teacher/${id}`,user);
}

export const DeleteTeacher = async (id) => {
    return await axios.post(`${usersUrl}/Dba/All_Teachers/delete_Teacher/${id}`);
}



export const getStudents = async (institutionId) => {
    return await axios.post(`${usersUrl}/Dba/All_Students`, institutionId);
}
export const getOneStudent = async (id) => {
    return await axios.post(`${usersUrl}/Dba/All_Students/edit_Student/${id}`);
}

export const UpdateStudent = async (user,id) => {
    return await axios.post(`${usersUrl}/Dba/All_Students/update_Student/${id}`,user);
}

export const DeleteStudent = async (id) => {
    return await axios.post(`${usersUrl}/Dba/All_Students/delete_Student/${id}`);
}



export const FeesRegistration = async (user) => {
    return await axios.post(`${usersUrl}/Dba/fees_section`, user);
}

export const getFeesDetails = async (institutionId) => {
    return await axios.post(`${usersUrl}/Dba/fees_section/All_Details`, institutionId);
}
export const getStudentFeeDetail = async (id) => {
    return await axios.post(`${usersUrl}/Dba/fees_section/edit_fees/${id}`);
}

export const UpdateStudentFeeDetail = async (user,id) => {
    return await axios.post(`${usersUrl}/Dba/fees_section/update_fees/${id}`,user);
}

// export const DeleteStudentFeeDetail = async (id) => {
//     return await axios.post(`${usersUrl}/Dba/All_Fees/delete_StudentFee/${id}`);
// }

// export const studentLogin = async (user) => {
//     return await axios.post(`${usersUrl}/s_login`, user);
// }
export const getStudentsForAttendence = async (user) => {
    return await axios.post(`${usersUrl}/teacher/getStudent`, user);
}
export const isAlreadyRegistered = async (user) => {
    return await axios.post(`${usersUrl}/teacher/isAlreadyRegistered`, user);
}
export const isAlreadyRegisteredStudentsData = async (user) => {
    return await axios.post(`${usersUrl}/teacher/registeredStudentAttendence`, user);
}
export const SaveAttendenceData = async (user) => {
    return await axios.post(`${usersUrl}/teacher/studentAttendence`, user);
}
export const UpdateStudentAttendence = async (user) => {
    return await axios.post(`${usersUrl}/teacher/UpdateStudentAttendenceData`, user);
}


export const isAlreadyMarksRegistered = async (user) => {
    return await axios.post(`${usersUrl}/teacher/isAlreadyMarksRegistered`, user);
}
export const registeredStudentMarksData = async (user) => {
    return await axios.post(`${usersUrl}/teacher/registeredStudentMarksData`, user);
}
export const StudentMarks = async (user) => {
    return await axios.post(`${usersUrl}/teacher/StudentMarks`, user);
}
export const UpdateStudentMarkssData = async (user) => {
    return await axios.post(`${usersUrl}/teacher/UpdateStudentMarksData`, user);
}


export const getStudentsAttendence = async (user) => {
    return await axios.post(`${usersUrl}/student/getStudentAttendenceData`, user);
}
export const getStudentsMarks = async (user) => {
    return await axios.post(`${usersUrl}/student/getStudentMarksData`, user);
}