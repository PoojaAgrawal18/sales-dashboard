/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import { motion } from 'framer-motion';
/* eslint-disable react/jsx-no-undef */
import React, { useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    List,
    Paper,
    Badge,
    Avatar,
    ListItem,
    Typography,
    IconButton,
    ListItemText,
    ListItemAvatar,
} from '@mui/material';

// Animation variants for the notification panel
const panelVariants = {
    hidden: {
        opacity: 0,
        y: -10,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: 0.15,
            ease: 'easeIn',
        },
    },
};

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.3,
            ease: 'easeOut',
        },
    }),
};

const MotionPaper = motion(Paper);
const MotionListItem = motion(ListItem);

// Mock notification data - replace with your actual data
const notificationData = [
    {
        id: 1,
        title: 'Billing & Collection Services',
        time: '4 hours ago',
        isRead: false,
    },
    {
        id: 2,
        title: 'Billing & Collection Services',
        time: 'Yesterday',
        isRead: false,
    },
    {
        id: 3,
        title: 'Billing & Collection Services',
        time: 'Monday',
        isRead: true,
    },
    {
        id: 4,
        title: 'Billing & Collection Services',
        time: 'Friday',
        isRead: true,
    },
    {
        id: 5,
        title: 'Billing & Collection Services',
        time: '4 days ago',
        isRead: true,
    },
    {
        id: 6,
        title: 'Billing & Collection Services',
        time: 'Yesterday',
        isRead: true,
    },
    {
        id: 7,
        title: 'Billing & Collection Services',
        time: 'Monday',
        isRead: true,
    },
];

export default function NotificationPanel() {
    const theme = useTheme();
    const [notificationOpen, setNotificationOpen] = useState(false);
    const notificationButtonRef = useRef(null);

    // Calculate unread count
    const unreadCount = notificationData.filter(notification => !notification.isRead).length;

    const handleNotificationClick = () => {
        setNotificationOpen(!notificationOpen);
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
    };

    return (
        <>
            {/* Notification Icon Button */}
            <IconButton
                ref={notificationButtonRef}
                onClick={handleNotificationClick}
                sx={{
                    '&:hover': {
                        backgroundColor: 'rgba(107, 114, 128, 0.1)',
                    },
                }}
            >
                <Badge
                    badgeContent={unreadCount}
                    color="error"
                    sx={{
                        '& .MuiBadge-badge': {
                            fontSize: '10px',
                            height: '16px',
                            minWidth: '16px',
                        },
                    }}
                >
                    <img
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            color: '#6B7280',
                            width: '24px'
                        }}
                        src='../../../assets/icon/header/bell.svg'
                        alt='notification-icon'
                    />
                </Badge>
            </IconButton>

            {/* Backdrop */}
            {notificationOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: theme.zIndex.modal - 1,
                    }}
                    onClick={handleNotificationClose}
                />
            )}

            {/* Notification Panel */}
            {notificationOpen && (
                <MotionPaper
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={panelVariants}
                    elevation={8}
                    sx={{
                        position: 'absolute',
                        top: notificationButtonRef.current ?
                            notificationButtonRef.current.getBoundingClientRect().bottom + 8 : '80px',
                        right: '0px',
                        width: '371px',
                        maxHeight: '500px',
                        borderRadius: 0,
                        overflow: 'visible',
                        zIndex: theme.zIndex.modal,
                        border: '1px solid #e5e7eb',
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            backgroundColor: '#0D477A',
                            color: 'white',
                            py: 2,
                            px: 3,
                            mt: 3,
                            display: 'flex',
                            alignItems: 'center',
                            height: '40px',
                            justifyContent: 'space-between',
                            mb: 1,
                            position: 'relative',
                        }}
                    >
                        {/* Triangle Pointer */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-12px',
                                right: '39px',
                                width: 0,
                                height: 0,
                                borderLeft: '12px solid transparent',
                                borderRight: '12px solid transparent',
                                borderBottom: '12px solid #0D477A',
                                zIndex: 1,
                            }}
                        />
                        <Typography sx={{ fontWeight: 500, fontSize: '14px', color: '#FFFFFF' }}>
                            Notifications
                        </Typography>
                    </Box>

                    {/* Notification List */}
                    <List
                        sx={{
                            py: 0,
                            maxHeight: '400px',
                            overflow: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#f1f5f9',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#cbd5e1',
                                borderRadius: '2px',
                            },
                        }}
                    >
                        {notificationData.map((notification, index) => (
                            <React.Fragment key={notification.id}>
                                <MotionListItem
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={listItemVariants}
                                    sx={{
                                        py: 0.5,
                                        px: 3,
                                        cursor: 'pointer',
                                        position: 'relative',
                                        '&:hover': {
                                            backgroundColor: '#f8fafc',
                                        },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                width: '44px',
                                                height: '44px',
                                                backgroundColor: '#e5e7eb',
                                                color: '#6b7280',
                                            }}
                                        >
                                            {notification.title.charAt(0)}
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#292929',
                                                    fontSize: '12px',
                                                }}
                                            >
                                                {notification.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: '#292929',
                                                    fontSize: '12px',
                                                    fontWeight: 400,
                                                }}
                                            >
                                                {notification.time}
                                            </Typography>
                                        }
                                    />

                                    {/* Unread indicator */}
                                    {!notification.isRead && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                right: 20,
                                                top: '38%',
                                                transform: 'translateY(-50%)',
                                                width: 10,
                                                height: 10,
                                                mr: 1,
                                                backgroundColor: '#5BC0F8',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    )}
                                </MotionListItem>
                            </React.Fragment>
                        ))}
                    </List>
                </MotionPaper>
            )}
        </>
    );
}

NotificationPanel.propTypes = {
};