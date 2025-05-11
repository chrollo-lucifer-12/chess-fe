import {getUserGames, getUserInfo} from "@/app/user/actions";
import ProfilePage from "@/app/user/_components/profile-page";

const UserPage = async (props : {params : Promise<{username : string}>}) => {

    const params = await props.params
    const {username} = params

    const games = await getUserGames(username);
    const user = await getUserInfo(username);

    return <ProfilePage games={games} user={user!}/>
}

export default UserPage