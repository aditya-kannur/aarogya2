import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';

function Dashboard() {
    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/documents');
                setDocuments(response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, []);

    const handleRowClick = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/documents/${id}`);
            setSelectedDoc(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching document by ID:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDoc(null);
    };

    return (
        <div className='dashboard-container'>
            <div className='sidebar'>
                <p></p>
            </div>
            <div className='main-thing'>
                <div className='navigation-container'>
                    <div>Monitor</div>
                    <div>Searchbar</div>
                </div>
                <div className='stats-container'>
                    <div className='wokring-path'>
                        <div>document Ai / Review</div>
                        <div>Dashboard / table</div>
                    </div>
                    <div className='overview-container'>
                        <p className='stats-heading'>Execution Overview</p>
                        <div className='stats'>
                            <div className='pending'>
                                <p>Pending</p>
                                <div><span>32</span> Files queued</div>
                            </div>
                            <div className='completed'>
                                <p>Completed</p>
                                <div><span>32</span> Files succeeded</div>
                            </div>
                            <div className='rejected'>
                                <p>Rejected</p>
                                <div><span>32</span> Files failed</div>
                            </div>
                        </div>
                    </div>

                    <div className='table-heading'>
                        <p>Execution table</p>
                        <p>Production | Id</p>
                    </div>
                </div>

                <div className="items-container">
                    <table className="execution-table">
                        <thead>
                            <tr>
                                <th>Execution ID</th>
                                <th>File Name</th>
                                <th>File Type</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Review Status</th>
                                <th>Environment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map(doc => (
                                <tr key={doc._id} onClick={() => handleRowClick(doc._id)} className="clickable-row">
                                    <td>{doc.execution_id}</td>
                                    <td>{doc.fileName}</td>
                                    <td>{doc.fileType}</td>
                                    <td>{doc.startTime}</td>
                                    <td>{doc.endTime}</td>
                                    <td>{doc.reviewStatus}</td>
                                    <td>{doc.environment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && selectedDoc && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button" onClick={closeModal}>X</button>
                            <h3>Document Details</h3>
                            <p><strong>Execution ID:</strong> {selectedDoc.execution_id}</p>
                            <p><strong>File Name:</strong> {selectedDoc.fileName}</p>
                            <p><strong>File Type:</strong> {selectedDoc.fileType}</p>
                            <p><strong>Start Time:</strong> {selectedDoc.startTime}</p>
                            <p><strong>End Time:</strong> {selectedDoc.endTime}</p>
                            <p><strong>Review Status:</strong> {selectedDoc.reviewStatus}</p>
                            <p><strong>Environment:</strong> {selectedDoc.environment}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
