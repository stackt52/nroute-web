// material-ui

// project imports
import SubCard from 'components/ui-component/cards/SubCard';
import NewUser from "./NewUser";
import UserList from "./UserList";
import Typography from "@mui/material/Typography";
import Accordion from "../../../ui-component/extended/Accordion";
import {IconPlus} from "@tabler/icons-react";

const newUserContent = [
    {
        id: 'new-user',
        defaultExpand: false,
        title: (
            <>
                <Typography variant="h3" color="primary">
                    New user
                </Typography>
            </>
        ),
        content: (
            <NewUser/>
        )
    }
];

const Users = () => (
    <>
        <SubCard title="Users">
            <Accordion expandIcon={<IconPlus/>} data={newUserContent}/>
        </SubCard>
        <UserList />
    </>
);

export default Users;
