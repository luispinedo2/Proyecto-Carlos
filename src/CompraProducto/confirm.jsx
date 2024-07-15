
import React from 'react';
function ConfirmDialog({ mensaje, onConfirm, onCancel }) {
    return (
        <div className="confirm-dialog">
            <div className="confirm-dialog-content">
                <h2 className='text'>{mensaje}</h2>
                <button className="btn btn-success" onClick={onConfirm}>Confirmar</button>
                <button className="btn btn-danger" onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    );
}
export default ConfirmDialog;