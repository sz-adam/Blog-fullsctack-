function SortedPost({ sortBy, handleSortChange }) {
  return (
    <div className="flex items-center justify-center md:justify-start md:px-10 mb-4 space-x-2">
      <label >Sort by:</label>
      <select
        className="appearance-none border border-blue-400 px-4 py-2 rounded-full text-black"
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="date">Date </option>
        <option value="likes">Likes</option>
        <option value="comments">Comments</option>
        <option value="views">Views</option>
        <option value="postName">Post name</option>
        <option value="userName">User name</option>
      </select>
    </div>
  );
}

export default SortedPost;
