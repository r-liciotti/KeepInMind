function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="flex flex-col">
      <h2>Error</h2>
      <p>{error.message}</p>
    </div>
  );
}
export default ErrorComponent;
