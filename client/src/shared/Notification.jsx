import { Alert } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

const Notification = (props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 360, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: 360, opacity: 0 }}
      >
        <Alert variant="success">
          {props.alert}
        </Alert>
      </motion.div>
    </AnimatePresence>
  )
}

export default Notification;
