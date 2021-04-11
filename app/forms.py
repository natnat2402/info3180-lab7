from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import TextAreaField
from wtforms.validators import DataRequired
from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect()

class UploadForm(FlaskForm):
    
    descrip = TextAreaField('Description', validators=[DataRequired()])
    file = FileField('photo', validators = [FileRequired(),FileAllowed(['jpg', 'png', 'gif'], 'Images only!')])
    
