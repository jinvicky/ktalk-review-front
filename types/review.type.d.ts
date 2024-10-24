interface ReviewRegister {
  applyId: string;
  content: string;
}
interface Review {
  id: string;
  applyId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export { Review, ReviewRegister };
