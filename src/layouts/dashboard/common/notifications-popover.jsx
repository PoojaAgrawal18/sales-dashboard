import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
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

// ----------------------------------------------------------------------
// Styles – match dashboard header/nav (dark glass)
// ----------------------------------------------------------------------

const PANEL = {
  bg: 'rgba(15, 23, 42, 0.98)',
  border: '1px solid rgba(255,255,255,0.09)',
  headerBg: 'rgba(255,255,255,0.04)',
  headerBorder: '1px solid rgba(255,255,255,0.06)',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  accent: '#38bdf8',
  hover: 'rgba(148, 163, 184, 0.08)',
  unreadDot: '#38bdf8',
  scrollbarTrack: 'rgba(255,255,255,0.04)',
  scrollbarThumb: 'rgba(148, 163, 184, 0.3)',
};

// ----------------------------------------------------------------------

const panelVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.03, duration: 0.25, ease: 'easeOut' },
  }),
};

const MotionPaper = motion(Paper);
const MotionListItem = motion(ListItem);

// ----------------------------------------------------------------------
// Mock data – replace with real API
// ----------------------------------------------------------------------

const notificationData = [
  { id: 1, title: 'New deal won: Acme Corp', message: 'Deal closed at $45,000', time: '4 hours ago', isRead: false },
  { id: 2, title: 'Pipeline stage updated', message: 'TechStart Inc moved to Proposal', time: 'Yesterday', isRead: false },
  { id: 3, title: 'Weekly report ready', message: 'Q1 2026 summary available', time: 'Monday', isRead: true },
  { id: 4, title: 'Billing & Collection Services', message: 'Invoice #2847 sent', time: 'Friday', isRead: true },
  { id: 5, title: 'New lead assigned', message: 'Summit Ventures – John Doe', time: '4 days ago', isRead: true },
  { id: 6, title: 'Forecast updated', message: 'Revenue projection revised', time: 'Yesterday', isRead: true },
];

// ----------------------------------------------------------------------

export default function NotificationPanel() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationButtonRef = useRef(null);

  const unreadCount = notificationData.filter((n) => !n.isRead).length;

  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const buttonTop = notificationButtonRef.current
    ? notificationButtonRef.current.getBoundingClientRect().bottom + 8
    : 72;

  return (
    <>
      <IconButton
        ref={notificationButtonRef}
        onClick={handleNotificationClick}
        sx={{
          color: PANEL.textMuted,
          '&:hover': {
            backgroundColor: PANEL.hover,
            color: PANEL.text,
          },
        }}
      >
        <Badge
          badgeContent={unreadCount}
          sx={{
            '& .MuiBadge-badge': {
              fontSize: 10,
              height: 18,
              minWidth: 18,
              background: PANEL.accent,
              color: '#0f172a',
            },
          }}
        >
          <NotificationsNoneRoundedIcon sx={{ fontSize: 24 }} />
        </Badge>
      </IconButton>

      {notificationOpen && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1299,
          }}
          onClick={handleNotificationClose}
          aria-hidden
        />
      )}

      {notificationOpen && (
        <MotionPaper
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={panelVariants}
          elevation={0}
          sx={{
            position: 'absolute',
            top: buttonTop,
            right: 16,
            width: 360,
            maxHeight: 420,
            borderRadius: 2,
            overflow: 'hidden',
            zIndex: 1300,
            background: PANEL.bg,
            border: PANEL.border,
            boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Arrow */}
          <Box
            sx={{
              position: 'absolute',
              top: -8,
              right: 24,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: `8px solid ${PANEL.bg}`,
              zIndex: 1,
            }}
          />

          {/* Header */}
          <Box
            sx={{
              py: 1.5,
              px: 2,
              borderBottom: PANEL.headerBorder,
              background: PANEL.headerBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14,
                color: PANEL.text,
              }}
            >
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Box
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  background: 'rgba(56, 189, 248, 0.2)',
                  color: PANEL.accent,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {unreadCount} new
              </Box>
            )}
          </Box>

          {/* List */}
          <List
            sx={{
              py: 0,
              maxHeight: 340,
              overflow: 'auto',
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-track': { backgroundColor: PANEL.scrollbarTrack, borderRadius: 3 },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: PANEL.scrollbarThumb,
                borderRadius: 3,
              },
            }}
          >
            {notificationData.map((notification, index) => (
              <MotionListItem
                key={notification.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={listItemVariants}
                sx={{
                  py: 1.25,
                  px: 2,
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  '&:hover': {
                    backgroundColor: PANEL.hover,
                  },
                  '&:last-of-type': {
                    borderBottom: 'none',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: 'rgba(56, 189, 248, 0.2)',
                      color: PANEL.accent,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {notification.title.charAt(0)}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: notification.isRead ? PANEL.textMuted : PANEL.text,
                        fontSize: 13,
                        lineHeight: 1.35,
                      }}
                    >
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        color: PANEL.textMuted,
                        fontSize: 12,
                        fontWeight: 400,
                        mt: 0.25,
                      }}
                    >
                      {notification.message} · {notification.time}
                    </Typography>
                  }
                />

                {!notification.isRead && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: PANEL.unreadDot,
                      flexShrink: 0,
                      ml: 1,
                    }}
                  />
                )}
              </MotionListItem>
            ))}
          </List>

          {notificationData.length === 0 && (
            <Box
              sx={{
                py: 4,
                textAlign: 'center',
                color: PANEL.textMuted,
                fontSize: 13,
              }}
            >
              No notifications yet
            </Box>
          )}
        </MotionPaper>
      )}
    </>
  );
}

NotificationPanel.propTypes = {
  // Add props here if needed later
};
