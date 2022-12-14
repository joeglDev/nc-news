const ErrorHandling = ({ error }) => {
  return (
    <header className="Errors__h">
      <h1>Sorry something went wrong:</h1>
      <h2>{error}</h2>
      <h3>
        Please select "All articles" for all articles or "Topics" for articles by
        topic.
      </h3>
    </header>
  );
};

export default ErrorHandling;
