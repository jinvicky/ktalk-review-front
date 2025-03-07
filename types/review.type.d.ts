interface ReviewRegister {
  applyId: string;
  content: string;
}
interface Review {
  id: string;
  applyId: string;
  content: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  rgtrDtFormatted: string;
}

export { Review, ReviewRegister };
