class Book < ApplicationRecord
  mount_uploader :file, LabelUploader
end
