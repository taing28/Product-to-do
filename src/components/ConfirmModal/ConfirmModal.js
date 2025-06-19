export const ConfirmModal = ({ isOpen, onClose, onConfirm, message, dataId }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message || 'Are you sure?'}</p>
                <div className="modal-actions" style={{marginTop: '8px'}}>
                    <button className='btn'style={{ backgroundColor: 'green', color: '#fff' }} onClick={() => onConfirm(dataId)}>Confirm</button>
                    <button className='btn' onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}