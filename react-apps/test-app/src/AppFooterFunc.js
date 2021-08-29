import './AppFooter.css';

const AppFooterFunc = (props) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <hr />
      <p>Copyright &copy; 2020-{currentYear} Acme Ltd.</p>
    </div>
  );
}

export default AppFooterFunc;