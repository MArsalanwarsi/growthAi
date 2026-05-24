// Simulates endpoint throttling to prevent compute surges (especially for heavy AI processing)
export const throttle = (delayMs = 800) => (req, res, next) => {
  setTimeout(() => {
    next();
  }, delayMs);
};

export default throttle;
