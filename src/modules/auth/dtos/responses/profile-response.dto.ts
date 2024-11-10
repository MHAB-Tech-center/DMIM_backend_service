import { RMBRole } from "src/entities/RMBRole.entity";

export class ProfileResponse{
fullName : string;
email : string;
roles : any[];
rmbRole: RMBRole;
province : string;
district : string;
phoneNumber : string
profilePic : string

constructor(
    fullName : string,
    email : string,
    roles : any[],
    rmbRole: any,
    province : string,
    district : string,
    phoneNumber : string,
    profilePic : string){
        this.fullName = fullName;
        this.email = email;
        this.rmbRole = rmbRole;
        this.roles = roles;
        this.province = province;
        this.district = district;
        this.phoneNumber = phoneNumber;
        this.profilePic = profilePic

    }
}