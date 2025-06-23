from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(label="Full Name", max_length=100, required=True, widget=forms.TextInput(attrs={'placeholder': 'Your Name'}))
    email = forms.EmailField(label="Email Address", max_length=150, required=True, widget=forms.EmailInput(attrs={'placeholder': 'Your Email'}))
    phone = forms.CharField(label="Phone Number", max_length=20, required=False, widget=forms.TextInput(attrs={'placeholder': 'Your Phone Number (Optional)'}))
    subject = forms.ChoiceField(label="Subject", choices=[
        ('', 'Select a topic'),
        ('general', 'General Inquiry'),
        ('sales', 'Sales Inquiry'),
        ('support', 'Technical Support'),
        ('partnership', 'Partnership Opportunity'),
        ('careers', 'Careers'),
    ], required=True)
    message = forms.CharField(label="Your Message", widget=forms.Textarea(attrs={'rows': 5, 'placeholder': 'Your Message'}), required=True)

    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs.update({'class': 'form-control'})