@ECHO OFF

pushd %~dp0

REM Command file for Sphinx documentation

if "%SPHINXBUILD%" == "" (
	set SPHINXBUILD=sphinx-build
)
set SOURCEDIR=source
set BUILDDIR=build/en

if "%1" == "" goto help
if "%1" == "dev-mainnet" goto dev-mainnet
if "%1" == "dev-academy" goto dev-academy
if "%1" == "lint" goto lint

%SPHINXBUILD% >NUL 2>NUL
if errorlevel 9009 (
	echo.
	echo.The 'sphinx-build' command was not found. Make sure you have Sphinx
	echo.installed, then set the SPHINXBUILD environment variable to point
	echo.to the full path of the 'sphinx-build' executable. Alternatively you
	echo.may add the Sphinx directory to PATH.
	echo.
	echo.If you don't have Sphinx installed, grab it from
	echo.http://sphinx-doc.org/
	exit /b 1
)

%SPHINXBUILD% -M %1 %SOURCEDIR% %BUILDDIR% %SPHINXOPTS%
goto end

:dev-mainnet
sphinx-autobuild %SOURCEDIR%\mainnet %BUILDDIR%\mainnet
goto end

:dev-academy
sphinx-autobuild %SOURCEDIR%\academy %BUILDDIR%\academy
goto end

:lint
doc8 ./source --ignore D004 --ignore D002
goto end

:help
%SPHINXBUILD% -M help %SOURCEDIR% %BUILDDIR% %SPHINXOPTS%

:end
popd
