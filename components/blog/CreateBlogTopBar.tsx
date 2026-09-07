import React from 'react';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Button from '../Button';

interface CreateBlogTopBarProps {
  isEditing: boolean;
  saving: boolean;
  previewMode: boolean;
  onBack: () => void;
  onTogglePreview: () => void;
  onDelete: () => void;
  onSave: () => void;
}

const CreateBlogTopBar: React.FC<CreateBlogTopBarProps> = ({
  isEditing,
  saving,
  previewMode,
  onBack,
  onTogglePreview,
  onDelete,
  onSave,
}) => (
  <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row item-start sm:items-center gap-2 justify-center sm:justify-between">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-secondary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to blog
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onTogglePreview}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-secondary hover:bg-primary/20 border cursor-pointer border-gray-200 hover:border-gray-300 rounded-lg px-3 py-1.5 transition-colors"
        >
          <Eye className="w-4 h-4" />
          {previewMode ? 'Edit' : 'Preview'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onDelete}
            className="text-sm font-medium text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 hover:bg-red-100 cursor-pointer rounded-lg px-3 py-1.5 transition-colors"
          >
            Delete
          </button>
        )}

        {/* <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving…' : isEditing ? 'Update' : 'Publish'}
        </button> */}

        <Button
          variant="primary"
          type='button'
          size='sm'
          className='inline-flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60'
          onClick={onSave}
          disabled={saving}
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving…' : isEditing ? 'Update' : 'Publish'}
        </Button>
      </div>
    </div>
  </div>
);

export default CreateBlogTopBar;
