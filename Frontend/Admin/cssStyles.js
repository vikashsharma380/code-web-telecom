const cssStyles = `
  .action-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.3);
    background: #667eea !important;
    color: white !important;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  .table-row:hover {
    background: #f8f9ff;
  }
  
  .process-btn:hover,
  .solve-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  .nav-item:hover .dropdown {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
  }

  .nav-item .dropdown:hover {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
  }

  .dropdown-item:hover {
    background: #667eea !important;
    color: white !important;
    padding-left: 1.25rem !important;
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    .nav-item .dropdown {
      position: static;
      opacity: 1;
      visibility: visible;
      transform: none;
    }
  }
`;

export default cssStyles;
