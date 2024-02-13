const fetchUserFinancialData = async (userId, token) => {
  // console.log("here4");
  // console.log(userId);
  const response = await fetch(`http://localhost:3002/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch financial data');
  }
  // console.log("this is fetch data response");
  // console.log(data);
  return data;
};

export default { fetchUserFinancialData };
