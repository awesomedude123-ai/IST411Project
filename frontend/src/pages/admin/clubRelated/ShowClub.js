import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import {getAllClubs} from '../../../redux/clubRelated/clubHandle'
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  //Replace Class with club
  const { clublist, loading, error, getresponse } = useSelector((state) => state.club);
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllClubs(adminID, "Club"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error)
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.")
    setShowPopup(true)
    // dispatch(deleteUser(deleteID, address))
    //   .then(() => {
    //     dispatch(getAllSclasses(adminID, "Sclass"));
    //   })
  }

  const clubColumns = [
    { id: 'name', label: 'Club Name', minWidth: 170 },
    {id: 'type', label: 'Club Type', minWidth: 120},
  ]

  const clubRows = clublist && clublist.length > 0 && clublist.map((club) => {
    return {
      name: club.name,
      type: club.type,
      id: club._id,
    };
  })

  const clubButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
    return (
      <ButtonContainer>
        <IconButton onClick={() => deleteHandler(row.id, "club")} color="secondary">
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton variant="contained"
          onClick={() => navigate("/Admin/club/club/" + row.id)}>
          View
        </BlueButton>
      </ButtonContainer>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Club',
      action: () => navigate("/Admin/addclub")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Clubs',
      action: () => deleteHandler(adminID, "club")
    },
  ];

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {getresponse ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addclub")}>
                Add Club
              </GreenButton>
            </Box>
            :
            <>
              {Array.isArray(clublist) && clublist.length > 0 &&
                <TableTemplate buttonHaver={clubButtonHaver} columns={clubColumns} rows={clubRows} />
              }
              <SpeedDialTemplate actions={actions} />
            </>}
        </>
      }
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

    </>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;