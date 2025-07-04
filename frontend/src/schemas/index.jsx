import * as Yup from "yup";

export const registrationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    fullname: Yup.string().min(5).max(25).required("Please enter your full name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Password must match"),
     avatar: Yup.mixed()
        .required("Avatar is required")
        .test("fileType", "Unsupported format", (value) => value && ["image/jpeg", "image/png"].includes(value.type))
        .test("fileSize", "Too large", (value) => value && value.size <= 2 * 1024 * 1024),
    
})
export const loginSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"), 
})