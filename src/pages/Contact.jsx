import React from 'react';
import { motion } from 'framer-motion';
import { useResume } from '../ResumeContext';

const Contact = () => {
  const { data } = useResume();
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible:
<truncated 7864 bytes>