import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";

export default function ApplyForm() {
  const [activeTab, setActiveTab] = useState("company");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Company info
    companyName: "",
    companyNumber: "",
    industry: "",
    yearsTrading: "",
    annualRevenue: "",
    
    // Financial details
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    
    // Contact info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
  });

  useEffect(() => {
    // Load loan amount from localStorage or URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const amount = params.get("amount") || localStorage.getItem("loanAmount");
      if (amount) {
        setFormData((prev) => ({ ...prev, loanAmount: amount }));
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to backend
    console.log("Form submitted:", formData);
    setShowSuccess(true);
  };

  const canProceedToFinancial = formData.companyName && formData.companyNumber && formData.industry && formData.yearsTrading && formData.annualRevenue;
  const canProceedToContact = canProceedToFinancial && formData.loanAmount && formData.loanPurpose && formData.loanTerm;
  const canSubmit = canProceedToContact && formData.firstName && formData.lastName && formData.email && formData.phone;

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="financial" disabled={!canProceedToFinancial}>Financial</TabsTrigger>
          <TabsTrigger value="contact" disabled={!canProceedToContact}>Contact</TabsTrigger>
          <TabsTrigger value="review" disabled={!canSubmit}>Review</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          {/* Company Info */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Tell us about your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Your company name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyNumber">Company registration number *</Label>
                  <Input
                    id="companyNumber"
                    value={formData.companyNumber}
                    onChange={(e) => handleInputChange("companyNumber", e.target.value)}
                    placeholder="e.g., 12345678"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => handleInputChange("industry", value)}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="professional">Professional Services</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsTrading">Years trading *</Label>
                  <Select
                    value={formData.yearsTrading}
                    onValueChange={(value) => handleInputChange("yearsTrading", value)}
                  >
                    <SelectTrigger id="yearsTrading">
                      <SelectValue placeholder="How long have you been trading?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">Less than 1 year</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualRevenue">Annual revenue *</Label>
                  <Select
                    value={formData.annualRevenue}
                    onValueChange={(value) => handleInputChange("annualRevenue", value)}
                  >
                    <SelectTrigger id="annualRevenue">
                      <SelectValue placeholder="Select revenue range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-100k">€0 - €100,000</SelectItem>
                      <SelectItem value="100k-500k">€100,000 - €500,000</SelectItem>
                      <SelectItem value="500k-1m">€500,000 - €1,000,000</SelectItem>
                      <SelectItem value="1m-5m">€1,000,000 - €5,000,000</SelectItem>
                      <SelectItem value="5m+">€5,000,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  disabled={!canProceedToFinancial}
                  onClick={() => setActiveTab("financial")}
                >
                  Continue to financial details
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Details */}
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Details</CardTitle>
                <CardDescription>
                  Tell us about your funding needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan amount *</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    min="5000"
                    max="500000"
                    step="1000"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    placeholder="€50,000"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Between €5,000 and €500,000
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan purpose *</Label>
                  <Select
                    value={formData.loanPurpose}
                    onValueChange={(value) => handleInputChange("loanPurpose", value)}
                  >
                    <SelectTrigger id="loanPurpose">
                      <SelectValue placeholder="What will you use the funds for?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="working-capital">Working capital</SelectItem>
                      <SelectItem value="asset">Asset purchase</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="expansion">Business expansion</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="acquisition">Acquisition</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Preferred loan term *</Label>
                  <Select
                    value={formData.loanTerm}
                    onValueChange={(value) => handleInputChange("loanTerm", value)}
                  >
                    <SelectTrigger id="loanTerm">
                      <SelectValue placeholder="Select repayment period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="48">48 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab("company")}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="w-full"
                    disabled={!canProceedToContact}
                    onClick={() => setActiveTab("contact")}
                  >
                    Continue to contact info
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Info */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  How can we reach you?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+44 20 1234 5678"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position in company</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    placeholder="Director, Owner, CFO..."
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab("financial")}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="w-full"
                    disabled={!canSubmit}
                    onClick={() => setActiveTab("review")}
                  >
                    Review application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Review */}
          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Application</CardTitle>
                <CardDescription>
                  Please review your information before submitting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Company Information</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p><span className="font-medium text-foreground">Company:</span> {formData.companyName}</p>
                      <p><span className="font-medium text-foreground">Registration:</span> {formData.companyNumber}</p>
                      <p><span className="font-medium text-foreground">Industry:</span> {formData.industry}</p>
                      <p><span className="font-medium text-foreground">Years trading:</span> {formData.yearsTrading}</p>
                      <p><span className="font-medium text-foreground">Annual revenue:</span> {formData.annualRevenue}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Financial Details</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p><span className="font-medium text-foreground">Loan amount:</span> {formatCurrency(Number(formData.loanAmount))}</p>
                      <p><span className="font-medium text-foreground">Purpose:</span> {formData.loanPurpose}</p>
                      <p><span className="font-medium text-foreground">Term:</span> {formData.loanTerm} months</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p><span className="font-medium text-foreground">Name:</span> {formData.firstName} {formData.lastName}</p>
                      <p><span className="font-medium text-foreground">Email:</span> {formData.email}</p>
                      <p><span className="font-medium text-foreground">Phone:</span> {formData.phone}</p>
                      {formData.position && <p><span className="font-medium text-foreground">Position:</span> {formData.position}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab("contact")}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="w-full">
                    Submit application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <DialogTitle className="text-center">Application received!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for your application. We're reviewing your information and will get back to you within 24 hours.
              <br /><br />
              A confirmation email has been sent to <strong>{formData.email}</strong>.
              <br /><br />
              One of our team members (Theo, Luis, or Bernardo) will be in touch shortly.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => window.location.href = "/"} className="w-full">
            Return to home
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

