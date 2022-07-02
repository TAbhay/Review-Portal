import React  from 'react'
import abhay from "../../../Images/profile_abhay.png"
import pushkar from "../../../Images/profile_pushkar.png"
import "./Team.css"




const Team = () => {

    return (
        <div className="profile_page">
            <div className="col-left">
            <div className="profile_image profile_team">
                <div><img src={abhay} /></div>
                <div className= "team_details">
                    <h2>Abhay Tiwari</h2>
                    <h6>IIT Patna</h6>
                    <h6>BTech 2019-2023</h6>
                    <div className="social_account">
                    </div>
                </div>
            </div>
            </div>
            <div className="col-right">
            <div className="profile_image profile_team">
                <div><img src={pushkar} /></div>
                <div  className= "team_details">
                    <h2>Pushkar Maurya</h2>
                    <h6>IIT Patna</h6>
                    <h6>BTech 2019-2023</h6>
                    <div className="social_account">
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}


export default Team